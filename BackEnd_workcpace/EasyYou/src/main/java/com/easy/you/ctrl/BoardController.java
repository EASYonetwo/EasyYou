package com.easy.you.ctrl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easy.you.model.BoardRepositoryInterface;
import com.easy.you.model.BoardRepositoryInterfaceCommon;
import com.easy.you.model.BoardRepositoryInterfaceFile;
import com.easy.you.model.BoardVo;
import com.easy.you.repository.BoardLikesRepository;
import com.easy.you.repository.BoardRepository;


@RestController
@RequestMapping(value = "api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
	
	@Autowired
	private BoardRepository boardRepository;
	
	@Autowired
	private BoardLikesRepository boardLikesRepository;
	
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
		Pageable pageable = PageRequest.of(0, 3);
		List<BoardRepositoryInterfaceFile> likesPosts = boardLikesRepository.findTop3MostLikedByBtypeF(pageable);
		List<BoardRepositoryInterfaceFile> latestPosts = boardRepository.findTop5ByBtypeOrderByRegdateDesc(PageRequest.of(0, 5));
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
	
	//파일 게시판
	//전체 조회
	@GetMapping(value = "/board/file")
	public List<BoardRepositoryInterfaceCommon> getAllFileBoard() {
		return boardRepository.findByFileOrderByRegdateDesc();
	}
}
