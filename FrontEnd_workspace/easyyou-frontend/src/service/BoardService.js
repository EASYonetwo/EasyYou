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

    //댓글 게시판 상세 조회
    //게시글의 글 번호를 보내주셔야 합니다
    /*
    getReplyBoardOne(boardSeq){
        return axios.get(USER_API_BASE_URL+"/board/reply",boardSeq);
    }
    */

    //파일 게시판 글 작성
    //게시글의 제목(title), 내용(content), 작성자(id)를 json으로 보내주세요
    insertReplyBoard(boardVo){
        return axios.post(USER_API_BASE_URL+"/board/reply",boardVo);
    }

    //파일 게시판
    //게시글 전체 조회
    getFileBoardAll(){
        return axios.get(USER_API_BASE_URL+"/board/file");
    }

    //파일 게시판 상세 조회
    //게시글의 글 번호를 보내주셔야 합니다
    /*
    getFileBoardOne(boardSeq){
        return axios.get(USER_API_BASE_URL+"/board/reply",boardSeq);
    }
    */

    //파일 게시판 글 작성
    //게시글의 제목(title), 내용(content), 작성자(id), 파일들(files)을 form-data로 보내주세요
    //파일이 없을경우 form-data에 담지 말아주세요
    //파일의 경우 최대 16MB입니다
    //form header에 multipart-form/data 담아서 보내주세요
    insertFileBoard(formData){
        return axios.post(USER_API_BASE_URL+"/board/file",formData);
    }
}

export default new BoardService();