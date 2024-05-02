package com.easy.you.ctrl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easy.you.model.BoardRepositoryInterface;
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
	
	//댓글 게시판
	@GetMapping(value = "/main/board/reply")
	public List<Object> likesAndNewRBoard(){
		Pageable pageable = PageRequest.of(0, 3);
		List<BoardRepositoryInterface> likesPosts = boardLikesRepository.findTop3MostLikedByBtypeR(pageable);
		List<BoardVo> latestPosts = boardRepository.findTop5ByBtypeOrderByRegdateDesc("R");
		List<Object> mainBoardReply = new ArrayList<Object>();
		for(BoardRepositoryInterface likeb : likesPosts) {
			mainBoardReply.add(likeb);
		}
		for(BoardVo latestb : latestPosts) {
			mainBoardReply.add(latestb);
		}
		return mainBoardReply;
	}
	
	// 파일 게시판
	@GetMapping(value = "/main/board/file")
	public List<Object> likesAndNewFBoard() {
		Pageable pageable = PageRequest.of(0, 3);
		List<BoardRepositoryInterface> likesPosts = boardLikesRepository.findTop3MostLikedByBtypeF(pageable);
		List<BoardVo> latestPosts = boardRepository.findTop5ByBtypeOrderByRegdateDesc("F");
		List<Object> mainBoardFile = new ArrayList<Object>();
		for (BoardRepositoryInterface likeb : likesPosts) {
			mainBoardFile.add(likeb);
		}
		for (BoardVo latestb : latestPosts) {
			mainBoardFile.add(latestb);
		}
		return mainBoardFile;
	}
}
