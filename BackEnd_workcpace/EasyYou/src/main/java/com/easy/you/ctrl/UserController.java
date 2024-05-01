package com.easy.you.ctrl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easy.you.model.UserVo;
import com.easy.you.repository.UserRepository;

@RestController
@RequestMapping(value = "api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	//회원 전체 조회
	@GetMapping(value = "/users")
	public List<UserVo> getAllUsers(){
		return userRepository.findAll();
	}
	
	//아이디 중복 체크
	@GetMapping(value = "/idCheck/{id}")
	public int idCheck(@PathVariable String id) {
		System.out.println("입력받은 ID"+id);
		Optional<UserVo> idCheck = userRepository.findById(id);
		if(idCheck.isEmpty()) {
			return 0;
		}else {
			return 1;
		}
	}
	
	//로그인
	@PostMapping(value = "/login")
	public UserVo login(String id, String password) {
		UserVo loginVo = userRepository.findByIdAndPassword(id,password);
		return loginVo;
	}
}
