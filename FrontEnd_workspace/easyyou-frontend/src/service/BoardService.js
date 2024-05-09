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

    //게시판 상세 조회
    //게시글의 글 번호를 보내주셔야 합니다
    //게시글은 boardVo에 담아보내고, (공통)
    //댓글은 replyVos에 담았고, (댓글 게시판)
    //파일은 fileVos에 담아서 보냈습니다 (파일 게시판)

    //댓글의 경우 groupnum은 하나의 댓글(+답글이 포함된) 묶음입니다
    //depthnum은 댓글의 깊이를 뜻합니다(depth => 0(본 댓글) ,1,2,.. (답글이 달리는 순서))
    getBoardOne(boardSeq){
        return axios.get(USER_API_BASE_URL+"/board/"+boardSeq);
    }

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

    //파일 게시판 글 작성
    //게시글의 제목(title), 내용(content), 작성자(id), 파일들(files)을 form-data로 보내주세요
    //파일이 없을경우 form-data에 담지 말아주세요
    //파일의 경우 최대 16MB입니다
    //form header에 multipart/form-data 담아서 보내주세요
    insertFileBoard(formData){
        return axios.post(USER_API_BASE_URL+"/board/file",formData);
    }
}

export default new BoardService();