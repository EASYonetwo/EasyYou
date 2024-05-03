import axios from "axios";

//const USER_API_BASE_URL = 'http://183.101.134.54:8073/api/v1';
//const USER_API_BASE_URL = 'http://14.54.176.241:8073/api/v1';

const USER_API_BASE_URL = 'http://localhost:8073/api/v1';

class BoardService{
    //메인화면에서 보이는 게시판의 경우
    //총 3개, 5개이지만 갯수가 적어서 3개 5개가 아닐 수 있음
    //좋아요는 like로 묶어서 보냈고, 최신은 latest로 묶어서 보냈음

    /* 메인 게시판 */
    //메인화면 댓글 게시판
    mainReplyBoard(){
        return axios.get(USER_API_BASE_URL+"/main/board/reply");
    }

    //메인화면 파일 게시판
    mainFileBoard(){
        return axios.get(USER_API_BASE_URL+"/main/board/file");
    }


    /* 게시판 */
    //댓글 게시판
    //게시글 전체 조회
    getReplyBoardAll(){
        return axios.get(USER_API_BASE_URL+"/board/reply");
    }

    //파일 게시판
    getFileBoardAll(){
        return axios.get(USER_API_BASE_URL+"/board/file");
    }
}

export default new BoardService();