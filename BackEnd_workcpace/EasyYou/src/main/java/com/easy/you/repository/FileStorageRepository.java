package com.easy.you.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.FileStorageVo;

public interface FileStorageRepository extends JpaRepository<FileStorageVo, Long>{

}
