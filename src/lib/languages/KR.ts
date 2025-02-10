import type { Language } from '$lib/language';

const language: Language = {
    name: '한국',
    code: 'KR',
    translator: 'tazik',
    phrases: {
        Leaderboards: '리더보드',
        Donate: '기부',
        'Save Changes': '변경 사항 저장',
        'Settings': '설정',
        'Requests': '리츠',
        'New Password': '새 비밀번호',
        'Current Password': '현재 비밀번호',
        'Change Password': '비밀번호 변경',
        'Change Username': '사용자 이름 변경',
        'enter new username': '새 사용자 이름 입력',
        'New Username': '새 사용자 이름',
        'Upload Avatar': '아바타 업로드',
        'Upload Cover': '커버 업로드',
        'Avatar': '아바타',
        'Cover': '커버',
        'Avatar updated successfully, ctrl + f5 to reload': '아바타가 성공적으로 업데이트되었습니다, ctrl + f5로 새로 고침',
        'Cover updated successfully, ctrl + f5 to reload': '커버가 성공적으로 업데이트되었습니다, ctrl + f5로 새로 고침',
        'An error occurred while uploading the avatar': '아바타 업로드 중 오류가 발생했습니다',
        'An error occurred while uploading the cover': '커버 업로드 중 오류가 발생했습니다',
        'Username updated successfully': '사용자 이름이 성공적으로 업데이트되었습니다',
        'Password updated successfully': '비밀번호가 성공적으로 업데이트되었습니다',
        'Failed to update username': '사용자 이름 업데이트 실패',
        'Failed to update password': '비밀번호 업데이트 실패',
        'Who are you looking for?': '누구를 찾고 있나요?',
        Accuracy: '정확도',
        'Play Count': '플레이 횟수',
        'Pass Count': '클리어 횟수',
        'Total Score': '총 점수',
        Score: '점수',
        Joined: '가입일',
        'Latest Activity': '최근 활동',
        'Ranked Score': '랭크 점수',
        'Hit Accuracy': '히트 정확도',
        'Maximum Combo': '최대 콤보',
        'Max Combo': '최대 콤보',
        'Replays Watched by Others': '다른 사람들이 본 리플레이',
        'Global Ranking': '글로벌 랭킹',
        'Country Ranking': '국가별 랭킹',
        'Performance Points': 'PP',
        'Total Play Time': '총 플레이 시간',
        'show more': '더 보기',
        Download: '다운로드',
        'Show on osu.ppy.sh': 'peppy 사이트에서 보기',
        'Download Replay': '리플레이 다운로드',
        'me!': '나!',
        Ranks: '랭크',
        Rank: '랭크',
        today: '오늘',
        '{{val}} day ago': '{{val}}일 전',
        '{{val}} days ago': '{{val}}일 전',
        '{{val}} week ago': '{{val}}주 전',
        '{{val}} weeks ago': '{{val}}주 전',
        '{{val}} month ago': '{{val}}개월 전',
        '{{val}} months ago': '{{val}}개월 전',
        '{{val}} year ago': '{{val}}년 전',
        '{{val}} years ago': '{{val}}년 전',
        '{{val}} hour': '{{val}}시간',
        '{{val}} hours': '{{val}}시간',
        'weighted {{val}}%': '가중치 {{val}}%',
        'Sign Up': '가입',
        'Sign In': '로그인',
        'online users': '온라인 사용자',
        'registered users': '등록된 사용자',
        Profile: '프로필',
        Logout: '로그아웃',
        'This is taking longer than expected...': '예상보다 시간이 더 걸립니다...',
        'Use your {{val}} Account': '{{val}} 계정 사용',
        'Email or Username': '이메일 또는 사용자 이름',
        'Forgot email?': '이메일을 잊으셨나요?',
        'Create account': '계정 만들기',
        Next: '다음',
        Welcome: '환영합니다',
        Password: '비밀번호',
        'Forgot password?': '비밀번호를 잊으셨나요?',
        Back: '뒤로',
        Login: '로그인',
        'Back to Home': '홈으로 돌아가기',
        'Difficulty Rating': '난이도',
        Length: '길이',
        'Failed to load leaderboard.': '리더보드를 불러오지 못했습니다.',
        Refresh: '새로 고침',
        'Beatmap not found.': '비트맵을 찾을 수 없습니다.',
        'There are a few possible reasons for this:': '이에 대한 몇 가지 가능한 이유가 있습니다:',
        'The map was deleted': '맵이 삭제되었습니다',
        'The map has not been cached yet': '맵이 아직 캐시되지 않았습니다',
        'You may have made a typo!': '오타를 냈을 수 있습니다!',
        Player: '플레이어',
        Time: '시간',
        'User Profile not found.': '사용자 프로필을 찾을 수 없습니다.',
        'They may have changed their username': '사용자 이름을 변경했을 수 있습니다',
        'The account may be temporarily unavailable due to security or abuse issues':
            '보안 또는 남용 문제로 인해 계정이 일시적으로 사용 불가능할 수 있습니다',
        'Failed to load beatmap.': '비트맵을 불러오지 못했습니다.',
        Page: '페이지',
        'Logged out successfully!': '로그아웃 성공!',
        'Please complete the captcha!': '캡차를 완료해주세요!',
        'Welcome back, {{val}}!': '다시 오신 것을 환영합니다, {{val}}!',
        'Catcha validation failed': '캡차 검증 실패',
        'Invalid login credentials': '잘못된 로그인 정보',
        'Failed to create session': '세션 생성 실패',
        'Login successful': '로그인 성공',
        'Clan Owner': '클랜 소유자',
        'Clan Members': '클랜 멤버',
        achieved: '달성',
        'No Scores found.': '점수를 찾을 수 없습니다.',
        Historical: '기록',
        'Most Played Beatmaps': '가장 많이 플레이된 비트맵',
        'Best Performance': '최고 성적',
        Recent: '최근',
        'progress to next level': '다음 레벨로의 진행',
        'View Leaderboards': '리더보드 보기',
        'View Profile': '프로필 보기',
    }
};

export default language;