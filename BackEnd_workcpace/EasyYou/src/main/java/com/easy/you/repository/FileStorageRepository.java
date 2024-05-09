package com.easy.you.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.FileStorageVo;

public interface FileStorageRepository extends JpaRepository<FileStorageVo, Long>{

	List<FileStorageVo> findByBoardBoardseqAndEnabled(long boardSeq, String enabled);
}
