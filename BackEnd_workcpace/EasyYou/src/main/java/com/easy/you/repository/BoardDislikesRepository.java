package com.easy.you.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.BoardDislikesVo;

public interface BoardDislikesRepository extends JpaRepository<BoardDislikesVo, Long>{

}
