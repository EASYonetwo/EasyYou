package com.easy.you.ctrl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.easy.you.model.BoardRepositoryInterface;
import com.easy.you.model.BoardRepositoryInterfaceCommon;
import com.easy.you.model.BoardRepositoryInterfaceFile;
import com.easy.you.model.BoardVo;
import com.easy.you.model.FileStorageVo;
import com.easy.you.model.UserVo;
import com.easy.you.repository.BoardLikesRepository;
import com.easy.you.repository.BoardRepository;
import com.easy.you.repository.FileStorageRepository;


@RestController
@RequestMapping(value = "api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
	
	@Autowired
	private BoardRepository boardRepository;
	
	@Autowired
	private BoardLikesRepository boardLikesRepository;
	
	@Autowired
	private FileStorageRepository fileStorageRepository;
	
	//메인화면
	//댓글 게시판 - 메인
	@GetMapping(value = "/main/board/reply")
	public Map<String, Object> likesAndNewRBoard(){
		Pageable pageable = PageRequest.of(0, 3);
		List<BoardRepositoryInterface> likesPosts = boardLikesRepository.findTop3MostLikedByBtypeR(pageable);
		List<BoardVo> latestPosts = boardRepository.findTop5ByBtypeOrderByRegdateDesc("R");
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
		for(int i=1; i<likesPostsTest.size(); i++) {
			if (likesPostsTest.get(i).getFileBoardseq() != likesPosts.get(i - 1).getFileBoardseq()) {
				likesPosts.add(likesPostsTest.get(i));
			} else {
				break;
			}
			if(likesPosts.size()==3) {break;}
		}
		List<BoardRepositoryInterfaceFile> latestPosts = boardRepository.findTop5ByFileOrderByRegdateDesc();
//		List<BoardRepositoryInterfaceFile> latestPosts = new ArrayList<BoardRepositoryInterfaceFile>();
//		latestPosts.add(latestPostsTest.get(0));
//		for(int i=1; i<latestPostsTest.size(); i++) {
//			if (latestPostsTest.get(i).getFileBoardseq() != latestPosts.get(i - 1).getFileBoardseq()) {
//				latestPosts.add(latestPostsTest.get(i));
//			} else {
//				break;
//			}
//			if(latestPosts.size()==5) {break;}
//		}
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
//	@GetMapping(value = "/board/reply")
//	public List<BoardRepositoryInterfaceCommon> getOneReplyBoard(long boardSeq){
//		return boardRepository.findByReplyOrderByRegdateDesc();
//	}
	
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
	
	//파일 게시판
	//전체 조회
	@GetMapping(value = "/board/file")
	public List<BoardRepositoryInterfaceCommon> getAllFileBoard() {
		return boardRepository.findByFileOrderByRegdateDesc();
	}
	
	// 파일게시판 글 작성
	@PostMapping(value = "/board/file")
	public String insertFileBoard(@RequestParam Map<String, Object> map, MultipartFile[] files) throws IOException {
		BoardVo boardVo = new BoardVo();
		boardVo.setRegdate(new Date());
		boardVo.setBtype("F");
		boardVo.setDelflag("N");

		String title = (String) map.get("title");
		String content = (String) map.get("content");

		if (title == "") {
			boardVo.setTitle("제목없음");
		} else {
			boardVo.setTitle(title);
		}
		if (content == "") {
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
}
