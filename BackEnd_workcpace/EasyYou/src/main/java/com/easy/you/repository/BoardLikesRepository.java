package com.easy.you.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.easy.you.model.BoardLikesVo;
import com.easy.you.model.BoardRepositoryInterface;
import com.easy.you.model.BoardRepositoryInterfaceFile;

public interface BoardLikesRepository extends JpaRepository<BoardLikesVo, Long>{
	@Query("SELECT b.boardseq AS boardseq, b.user AS user, b.title AS title, b.content AS content, b.btype AS btype, b.delflag AS delflag, b.regdate AS regdate "
			+ "FROM BoardVo b JOIN BoardLikesVo bl ON b.boardseq = bl.board.boardseq "
			+ "WHERE b.btype = 'R' AND b.delflag = 'N' " + "GROUP BY b.boardseq "
			+ "ORDER BY COUNT(bl.board.boardseq) DESC, b.regdate DESC")
	List<BoardRepositoryInterface> findTop3MostLikedByBtypeR(Pageable pageable);

	@Query("SELECT b.boardseq AS boardseq, b.user AS user, b.title AS title, b.content AS content, b.btype AS btype, b.delflag AS delflag, b.regdate AS regdate , f.file AS file ,  f.filename AS filename "
			+ "FROM BoardVo b JOIN BoardLikesVo bl ON b.boardseq = bl.board.boardseq "
			+ "LEFT JOIN FileStorageVo f ON f.board.boardseq = b.boardseq "
			+ "WHERE b.btype = 'F' AND b.delflag = 'N' " 
			+ "GROUP BY b.boardseq, f.file, f.board.boardseq, f.filename "
			+ "ORDER BY COUNT(bl.board.boardseq) DESC, b.regdate DESC")
	List<BoardRepositoryInterfaceFile> findTop3MostLikedByBtypeF();

	BoardLikesVo findByBoardBoardseqAndUserId(long boardSeq, String id);
}

