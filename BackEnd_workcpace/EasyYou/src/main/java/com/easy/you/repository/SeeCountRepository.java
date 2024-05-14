package com.easy.you.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.SeeCountVo;

public interface SeeCountRepository extends JpaRepository<SeeCountVo, Long>{

	SeeCountVo findByBoardBoardseqAndSeeip(long boardSeq, String ip);

}
