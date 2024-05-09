package com.easy.you.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.easy.you.model.BoardRepositoryInterfaceCommon;
import com.easy.you.model.BoardRepositoryInterfaceFile;
import com.easy.you.model.BoardVo;

public interface BoardRepository extends JpaRepository<BoardVo, Long>{
	// 최신 순서대로 최대 5개의 글을 가져옴 - 댓글
	List<BoardVo> findTop5ByBtypeOrderByRegdateDesc(String btype);
	
	// 최신 순서대로 최대 5개의 글을 가져옴 - 파일	
	@Query("SELECT b.boardseq AS boardseq, b.user AS user, b.title AS title, b.content AS content, b.btype AS btype, b.delflag AS delflag, b.regdate AS regdate , f.file AS file, f.board.boardseq AS fileBoardseq "
			+ "FROM BoardVo b " + "LEFT JOIN FileStorageVo f ON f.board.boardseq = b.boardseq "
			+ "WHERE b.btype = 'F' AND b.delflag = 'N' " 
			+ "GROUP BY b.boardseq, f.file, f.board.boardseq " 
			+ "ORDER BY b.regdate DESC")
	List<BoardRepositoryInterfaceFile> findTop5ByFileOrderByRegdateDesc();
	
	// 게시판 전체 조회 - 댓글
	@Query("SELECT b.boardseq AS boardseq, b.user AS user, b.title AS title, "
			+ "CONCAT(b.content, ' (', COALESCE((SELECT COUNT(r.replyseq) FROM ReplyVo r WHERE r.board.boardseq = b.boardseq), 0), ')') AS content, "
			+ "b.btype AS btype, b.delflag AS delflag, b.regdate AS regdate , "
			+ "COALESCE((SELECT COUNT(bl.boardlikeseq) FROM BoardLikesVo bl WHERE bl.board.boardseq = b.boardseq), 0) AS countLikes, "
			+ "COALESCE((SELECT COUNT(sc.seecountseq) FROM SeeCountVo sc WHERE sc.board.boardseq = b.boardseq), 0) AS countViews "
	        + "FROM BoardVo b "
	        + "WHERE b.btype = 'R' AND b.delflag = 'N' " 
	        + "GROUP BY b.boardseq "
	        + "ORDER BY b.regdate DESC")
	List<BoardRepositoryInterfaceCommon> findByReplyOrderByRegdateDesc();
	
	// 게시판 전체 조회 - 파일
	@Query("SELECT b.boardseq AS boardseq, b.user AS user, b.title AS title, "
			+ "CONCAT(b.content, ' (', COALESCE((SELECT COUNT(f.fileseq) FROM FileStorageVo f WHERE f.board.boardseq = b.boardseq), 0), ')') AS content, "
			+ "b.btype AS btype, b.delflag AS delflag, b.regdate AS regdate , "
			+ "COALESCE((SELECT COUNT(bl.boardlikeseq) FROM BoardLikesVo bl WHERE bl.board.boardseq = b.boardseq), 0) AS countLikes, "
			+ "COALESCE((SELECT COUNT(sc.seecountseq) FROM SeeCountVo sc WHERE sc.board.boardseq = b.boardseq), 0) AS countViews "
			+ "FROM BoardVo b " + "WHERE b.btype = 'F' AND b.delflag = 'N' " + "GROUP BY b.boardseq "
			+ "ORDER BY b.regdate DESC")
	List<BoardRepositoryInterfaceCommon> findByFileOrderByRegdateDesc();
}
