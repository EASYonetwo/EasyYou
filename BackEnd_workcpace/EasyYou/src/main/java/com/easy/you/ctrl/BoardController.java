package com.easy.you.ctrl;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.easy.you.GetClientIp;
import com.easy.you.model.BoardDislikesVo;
import com.easy.you.model.BoardLikesVo;
import com.easy.you.model.BoardRepositoryInterface;
import com.easy.you.model.BoardRepositoryInterfaceCommon;
import com.easy.you.model.BoardRepositoryInterfaceFile;
import com.easy.you.model.BoardVo;
import com.easy.you.model.FileStorageVo;
import com.easy.you.model.ReplyDislikesVo;
import com.easy.you.model.ReplyLikesVo;
import com.easy.you.model.ReplyRepositoryInterface;
import com.easy.you.model.ReplyVo;
import com.easy.you.model.SeeCountVo;
import com.easy.you.model.UserVo;
import com.easy.you.repository.BoardDislikesRepository;
import com.easy.you.repository.BoardLikesRepository;
import com.easy.you.repository.BoardRepository;
import com.easy.you.repository.FileStorageRepository;
import com.easy.you.repository.ReplyDislikesRepository;
import com.easy.you.repository.ReplyLikesRepository;
import com.easy.you.repository.ReplyRepository;
import com.easy.you.repository.SeeCountRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;



@RestController
@RequestMapping(value = "api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
	
	@Autowired
	private BoardRepository boardRepository;
	@Autowired
	private BoardLikesRepository boardLikesRepository;
	@Autowired
	private BoardDislikesRepository boardDislikesRepository;
	@Autowired
	private FileStorageRepository fileStorageRepository;
	@Autowired
	private ReplyRepository replyRepository;
	@Autowired
	private ReplyLikesRepository replyLikesRepository;
	@Autowired
	private ReplyDislikesRepository replyDislikesRepository;
	@Autowired
	private SeeCountRepository seeCountRepository;
	
	
	//메인화면
	//댓글 게시판 - 메인
	@GetMapping(value = "/main/board/reply")
	public Map<String, Object> likesAndNewRBoard(){
		Pageable pageable = PageRequest.of(0, 3);
		List<BoardRepositoryInterface> likesPosts = boardLikesRepository.findTop3MostLikedByBtypeR(pageable);
		List<BoardVo> latestPosts = boardRepository.findTop5ByBtypeAndDelflagOrderByRegdateDesc("R","N");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("like", likesPosts);
		map.put("latest", latestPosts);
		return map;
	}
	
	// 파일 게시판 - 메인
	@GetMapping(value = "/main/board/file")
	public Map<String, Object> likesAndNewFBoard() {
		List<BoardRepositoryInterfaceFile> likesPostsTest = boardLikesRepository.findTop3MostLikedByBtypeF();
		List<BoardRepositoryInterfaceFile> likesPosts = new ArrayList<BoardRepositoryInterfaceFile>();
		likesPosts.add(likesPostsTest.get(0));
		int j=0;
		for(int i=1; i<likesPostsTest.size(); i++) {
			if (likesPostsTest.get(i).getBoardseq() != likesPosts.get(j).getBoardseq()) {
				likesPosts.add(likesPostsTest.get(i));
				j++;
			}
			if(likesPosts.size()==3) {break;}
		}
		List<BoardRepositoryInterfaceFile> latestPostsTest = boardRepository.findTop5ByFileOrderByRegdateDesc();
		List<BoardRepositoryInterfaceFile> latestPosts = new ArrayList<BoardRepositoryInterfaceFile>();
		latestPosts.add(latestPostsTest.get(0));
		int k=0;
		for(int i=1; i<latestPostsTest.size(); i++) {
			if (latestPostsTest.get(i).getBoardseq() != latestPosts.get(k).getBoardseq()) {
				latestPosts.add(latestPostsTest.get(i));
				k++;
			}
			if(latestPosts.size()==5) {break;}
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("like", likesPosts);
		map.put("latest", latestPosts);
		return map;
	}
	
	//게시판
	//댓글 게시판
	//전체 조회
	@GetMapping(value = "/board/reply")
	public List<BoardRepositoryInterfaceCommon> getAllReplyBoard(){
		return boardRepository.findByReplyOrderByRegdateDesc();
	}
	
	//상세 조회
	@GetMapping(value = "/board/{boardSeq}/{id}")
	public ResponseEntity<Map<String, Object>> getOneReplyBoard(@PathVariable long boardSeq , @PathVariable String id, HttpServletRequest request){
		//조회수 증가
		try {
			String ip = GetClientIp.getClientIP(request);
            SeeCountVo seeVo = seeCountRepository.findByBoardBoardseqAndSeeip(boardSeq, ip);
    		if (seeVo == null) {
    			SeeCountVo plusSeeVo = new SeeCountVo();
    			BoardVo seeBoard = new BoardVo();
    			seeBoard.setBoardseq(boardSeq);
    			plusSeeVo.setBoard(seeBoard);
    			plusSeeVo.setSeeip(ip);
    			seeCountRepository.save(plusSeeVo);
    		} else {}
        } catch (Exception e) {
            e.printStackTrace();
        }
		//상세 조회
		Map<String, Object> map = new HashMap<String, Object>();
		BoardRepositoryInterfaceCommon boardVo = boardRepository.findOneByBoardseq(boardSeq);
		if(boardVo == null) {
			map.put("boardVo", "");
		}else {
			map.put("boardVo", boardVo);
			if(boardVo.getBtype().equals("R")) {
				//댓글 게시판의 게시글
				List<ReplyRepositoryInterface> replys = replyRepository.findByBoardBoardseqReply(boardSeq, id);
				map.put("replyVos", replys);
			}else if(boardVo.getBtype().equals("F")){
				//파일 게시판의 게시글
				List<FileStorageVo> fileVos = fileStorageRepository.findByBoardBoardseqAndEnabled(boardSeq,"Y");
				map.put("fileVos", fileVos);
			}
		}
		BoardLikesVo boardLikes = boardLikesRepository.findByBoardBoardseqAndUserId(boardSeq, id);
		if(boardLikes != null) {
			map.put("boardLikes", "Y");
		}else {
			map.put("boardLikes", "N");
		}
		BoardDislikesVo boardDislikes = boardDislikesRepository.findByBoardBoardseqAndUserId(boardSeq, id);
		if(boardDislikes != null) {
			map.put("boardDislikes", "Y");
		}else {
			map.put("boardDislikes", "N");
		}
		return ResponseEntity.ok(map);
	}
	
	//댓글게시판 글 작성
	@PostMapping(value = "/board/reply")
	public BoardVo insertReplyBoard(@RequestBody Map<String, Object> map) {
		BoardVo boardVo = new BoardVo();
		boardVo.setRegdate(new Date());
		boardVo.setBtype("R");
		boardVo.setDelflag("N");
		
		String title = (String)map.get("title");
		String content = (String)map.get("content");
		
		if(title == "") {
			boardVo.setTitle("제목없음");
		}else {
			boardVo.setTitle(title);
		}
		if(content == "") {
			boardVo.setContent("내용없음");
		}else {
			boardVo.setContent(content);
		}
		
		UserVo writer = new UserVo();
		writer.setId((String)map.get("id"));
		boardVo.setUser(writer);
		return boardRepository.save(boardVo);
	}
	
	//댓글 작성
	@PostMapping(value = "/reply")
	public String insertReply(@RequestBody Map<String, Object> map) {
		BoardVo boardVo = new BoardVo();
		long boardSeq = (long)(int)map.get("boardseq");
		boardVo.setBoardseq(boardSeq);
		UserVo userVo = new UserVo();
		String id = (String)map.get("id");
		userVo.setId(id);
		String content = (String)map.get("content");
		int maxGroupNum = replyRepository.findMaxGroupnumByBoardBoardseq(boardSeq);
		ReplyVo replyVo = new ReplyVo(0, boardVo, maxGroupNum, 0, content, new Date(), "N", userVo);
		replyRepository.save(replyVo);
		return "ok";
	}
	//답글 작성
	@PostMapping(value = "/replyReply")
	public String insertReplyReply(@RequestBody Map<String, Object> map) {
		UserVo userVo = new UserVo();
		String id = (String)map.get("id");
		userVo.setId(id);
		String content = (String)map.get("content");
		long replySeq = (int)map.get("replyseq");
		ReplyVo reply = replyRepository.findById(replySeq).get();
		long boardSeq = reply.getBoard().getBoardseq();
		int maxDepthnum = replyRepository.findMaxDepthnumByGroupnum(boardSeq,reply.getGroupnum());
		ReplyVo reReplyVo = new ReplyVo(0, reply.getBoard(), reply.getGroupnum(), maxDepthnum, content, new Date(), "N", userVo);
		replyRepository.save(reReplyVo);
		return "ok";
	}
	//댓글 삭제
	@PatchMapping(value = "/reply/{replySeq}")
	@Transactional //Transactional이 있어야 update됨
	public String deleteReply(@PathVariable long replySeq) {
		Optional<ReplyVo> checkReply = replyRepository.findById(replySeq);
		if(checkReply.isEmpty()) {
			return "no";
		}else if(checkReply.get().getDelflag().equals("Y")) {
			return "alreayDeleted";
		}else if(checkReply.get().getDelflag().equals("N")) {
			checkReply.get().setDelflag("Y");
			return "ok";
		}else {
			return "what";
		}
	}
	
	
	//파일 게시판
	//전체 조회
	@GetMapping(value = "/board/file")
	public List<BoardRepositoryInterfaceCommon> getAllFileBoard() {
		return boardRepository.findByFileOrderByRegdateDesc();
	}
	
	//파일게시판 글 작성
	@PostMapping(value = "/board/file")
	public String insertFileBoard(@RequestParam Map<String, Object> map, MultipartFile[] files) throws IOException {
		BoardVo boardVo = new BoardVo();
		boardVo.setRegdate(new Date());
		boardVo.setBtype("F");
		boardVo.setDelflag("N");

		String title = (String) map.get("title");
		String content = (String) map.get("content");

		if (title.trim() == "") {
			boardVo.setTitle("제목없음");
		} else {
			boardVo.setTitle(title);
		}
		if (content.trim() == "") {
			boardVo.setContent("내용없음");
		} else {
			boardVo.setContent(content);
		}

		UserVo writer = new UserVo();
		writer.setId((String) map.get("id"));
		boardVo.setUser(writer);
		boardRepository.save(boardVo);
		if(files != null) {
			for(MultipartFile file:files) {
				FileStorageVo fileVo = new FileStorageVo();
				fileVo.setBoard(boardVo);
				fileVo.setEnabled("Y");
				fileVo.setFilename(file.getOriginalFilename());
				fileVo.setFilesize((int)file.getSize());
				fileVo.setRegdate(new Date());
				//파일을 CLOB으로 저장하기 위함
				byte[] byteFile = file.getBytes();
				fileVo.setFile(byteFile);
				fileVo.setEnabled("Y");
				fileStorageRepository.save(fileVo);
			}
		}
		return "ok";
	}
	
	/* 파일 */
	//파일 다운로드
	@GetMapping(value = "/download/{fileSeq}")
	public void download(@PathVariable long fileSeq, HttpServletResponse response) throws IOException {
		Optional<FileStorageVo> file = fileStorageRepository.findById(fileSeq);
		
		response.setContentType("application/octext-stream");
		response.setContentLength(file.get().getFilesize());
		response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(file.get().getFilename(),"UTF-8")+"\";");
		response.setHeader("Content-Transfer-Encoding", "binary");
	    response.getOutputStream().write(file.get().getFile());
	    response.getOutputStream().flush();
	    response.getOutputStream().close();
	}
	
	
	//게시글 삭제(delflag -> N)
	@PatchMapping(value = "/board/delete/{boardSeq}")
	@Transactional
	public String deleteBoard(@PathVariable long boardSeq) {
		BoardVo boardVo = boardRepository.findByBoardseq(boardSeq);
		if(boardVo == null) {
			return "no";
		}else if(boardVo.getDelflag().equals("Y")) {
			return "alreayDeleted";
		}else if(boardVo.getDelflag().equals("N")){
			boardVo.setDelflag("Y");
			return "ok";
		}else {
			return "what";
		}
	}
	
	/*좋아요 싫어요*/
	//게시글 좋아요
	@GetMapping(value = "/board/likes/{boardSeq}/{id}")
	public String boardLikes(@PathVariable long boardSeq, @PathVariable String id) {
		BoardLikesVo checkBoardLikesVo = boardLikesRepository.findByBoardBoardseqAndUserId(boardSeq, id);
		if(checkBoardLikesVo == null) {
			BoardVo boardVo = new BoardVo();
			boardVo.setBoardseq(boardSeq);
			UserVo userVo = new UserVo();
			userVo.setId(id);
			BoardLikesVo boardLikesVo = new BoardLikesVo(0, boardVo,userVo);
			boardLikesRepository.save(boardLikesVo);
			return "ok";
		}else {
			return "no";
		}
	}
	//게시글 좋아요 취소
	@DeleteMapping(value = "/board/cancelLikes/{boardSeq}/{id}")
	public String cancelBoardLikes(@PathVariable long boardSeq, @PathVariable String id) {
		BoardLikesVo boardLikesVo = boardLikesRepository.findByBoardBoardseqAndUserId(boardSeq, id);
		if(boardLikesVo == null) {
			return "no";
		}else {
			boardLikesRepository.delete(boardLikesVo);
			return "ok";
		}
	}
	//게시글 싫어요
	@GetMapping(value = "/board/dislikes/{boardSeq}/{id}")
	public String boardDislikes(@PathVariable long boardSeq, @PathVariable String id) {
		BoardDislikesVo checkBoardDislikesVo = boardDislikesRepository.findByBoardBoardseqAndUserId(boardSeq, id);
		if (checkBoardDislikesVo == null) {
			BoardVo boardVo = new BoardVo();
			boardVo.setBoardseq(boardSeq);
			UserVo userVo = new UserVo();
			userVo.setId(id);
			BoardDislikesVo boardDislikesVo = new BoardDislikesVo(0, boardVo, userVo);
			boardDislikesRepository.save(boardDislikesVo);
			return "ok";
		} else {
			return "no";
		}
	}

	//게시글 싫어요 취소
	@DeleteMapping(value = "/board/cancelDislikes/{boardSeq}/{id}")
	public String cancelBoardDisllikes(@PathVariable long boardSeq, @PathVariable String id) {
		BoardDislikesVo boardDislikesVo = boardDislikesRepository.findByBoardBoardseqAndUserId(boardSeq, id);
		if (boardDislikesVo == null) {
			return "no";
		} else {
			boardDislikesRepository.delete(boardDislikesVo);
			return "ok";
		}
	}
	//댓글 좋아요
	@GetMapping(value = "/reply/likes/{replySeq}/{id}")
	public String replyLikes(@PathVariable long replySeq, @PathVariable String id) {
		ReplyLikesVo checkReplyLikesVo = replyLikesRepository.findByReplyReplyseqAndUserId(replySeq, id);
		if(checkReplyLikesVo == null) {
			ReplyVo replyVo = new ReplyVo();
			replyVo.setReplyseq(replySeq);
			UserVo userVo = new UserVo();
			userVo.setId(id);
			ReplyLikesVo replyLikesVo = new ReplyLikesVo(0, replyVo,userVo);
			replyLikesRepository.save(replyLikesVo);
			return "ok";
		}else {
			return "no";
		}
	}
	//댓글 좋아요 취소
	@DeleteMapping(value = "/reply/cancelLikes/{replySeq}/{id}")
	public String cancelReplyLikes(@PathVariable long replySeq, @PathVariable String id) {
		ReplyLikesVo replyLikesVo = replyLikesRepository.findByReplyReplyseqAndUserId(replySeq, id);
		if(replyLikesVo == null) {
			return "no";
		}else {
			replyLikesRepository.delete(replyLikesVo);
			return "ok";
		}
	}
	//댓글 싫어요
	@GetMapping(value = "/reply/dislikes/{replySeq}/{id}")
	public String replyDislikes(@PathVariable long replySeq, @PathVariable String id) {
		ReplyDislikesVo checkReplyDislikesVo = replyDislikesRepository.findByReplyReplyseqAndUserId(replySeq, id);
		if (checkReplyDislikesVo == null) {
			ReplyVo replyVo = new ReplyVo();
			replyVo.setReplyseq(replySeq);
			UserVo userVo = new UserVo();
			userVo.setId(id);
			ReplyDislikesVo replyDisikesVo = new ReplyDislikesVo(0, replyVo, userVo);
			replyDislikesRepository.save(replyDisikesVo);
			return "ok";
		} else {
			return "no";
		}
	}
	//댓글 싫어요 취소
	@DeleteMapping(value = "/reply/cancelDislikes/{replySeq}/{id}")
	public String cancelReplyDislikes(@PathVariable long replySeq, @PathVariable String id) {
		ReplyDislikesVo replyDislikesVo = replyDislikesRepository.findByReplyReplyseqAndUserId(replySeq, id);
		if (replyDislikesVo == null) {
			return "no";
		} else {
			replyDislikesRepository.delete(replyDislikesVo);
			return "ok";
		}
	}
}
