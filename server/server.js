const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 카카오톡 API 설정
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

// 카카오톡 로그인 시작
app.get('/api/auth/kakao', (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    res.redirect(kakaoAuthURL);
});

// 카카오톡 로그인 콜백
app.get('/api/auth/kakao/callback', async (req, res) => {
    try {
        const { code } = req.query;
        
        if (!code) {
            return res.status(400).json({ error: 'Authorization code not found' });
        }

        // 액세스 토큰 요청
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', 
            `grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&code=${code}&redirect_uri=${KAKAO_REDIRECT_URI}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const { access_token } = tokenResponse.data;

        // 사용자 정보 요청
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        const userInfo = userResponse.data;

        // 로그인 성공 후 프론트엔드로 리다이렉트
        res.redirect(`http://localhost:3000/chat?token=${access_token}&userId=${userInfo.id}`);
        
    } catch (error) {
        console.error('Kakao login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// 카카오톡 사용자 정보 조회
app.get('/api/user/me', async (req, res) => {
    try {
        const { token } = req.query;
        
        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        res.json(response.data);
        
    } catch (error) {
        console.error('User info error:', error);
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});

// 카카오톡 프로필 정보 조회
app.get('/api/talk/profile', async (req, res) => {
    try {
        const { token } = req.query;
        
        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const response = await axios.get('https://kapi.kakao.com/v1/api/talk/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        res.json(response.data);
        
    } catch (error) {
        console.error('Talk profile error:', error);
        res.status(500).json({ error: 'Failed to fetch talk profile' });
    }
});

// 서버 상태 확인
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
    console.log(`Kakao auth callback: ${KAKAO_REDIRECT_URI}`);
});
