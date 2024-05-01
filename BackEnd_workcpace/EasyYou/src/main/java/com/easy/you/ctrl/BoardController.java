package com.easy.you.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easy.you.model.BoardLikesVo;
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
	//최신 순서대로 최대 5개의 글을 가져옴
	@GetMapping(value = "/main/board/reply")
	public List<?> likesAndNew(){
		List<BoardVo> latestPosts = boardRepository.findTop5ByBtypeOrderByRegdateDesc("R");
		return latestPosts;
	}
	

}
