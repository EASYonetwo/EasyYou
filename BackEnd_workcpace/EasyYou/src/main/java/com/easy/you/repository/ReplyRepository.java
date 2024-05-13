package com.easy.you.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.easy.you.model.ReplyRepositoryInterface;
import com.easy.you.model.ReplyVo;

public interface ReplyRepository extends JpaRepository<ReplyVo, Long>{
	
	@Query("SELECT r.replyseq AS replyseq, r.groupnum AS groupnum, r.depthnum AS depthnum, "
			+ "r.content AS content, r.delflag AS delflag, r.regdate AS regdate ,r.user.id AS id , "
			+ "COALESCE((SELECT COUNT(rl.replylikeseq) FROM ReplyLikesVo rl WHERE rl.reply.replyseq = r.replyseq), 0) AS countLikes, "
			+ "CASE (SELECT COUNT(rl.user.id) FROM ReplyLikesVo rl WHERE rl.reply.replyseq = r.replyseq AND rl.user.id = ?2) WHEN 1 THEN 'Y' ELSE 'N' END AS replyLikes, "
			+ "COALESCE((SELECT COUNT(rd.replydislikeseq) FROM ReplyDislikesVo rd WHERE rd.reply.replyseq = r.replyseq), 0) AS countDislikes, "
			+ "CASE (SELECT COUNT(rd.user.id) FROM ReplyDislikesVo rd WHERE rd.reply.replyseq = r.replyseq AND rd.user.id = ?2) WHEN 1 THEN 'Y' ELSE 'N' END AS replyDislikes "
			+ "FROM ReplyVo r " + "WHERE r.board.boardseq = ?1 AND r.delflag = 'N' "
			+ "ORDER BY groupnum DESC, depthnum ")
	List<ReplyRepositoryInterface> findByBoardBoardseqReply(long boardSeq, String id);

	@Query("SELECT MAX(r.groupnum) FROM ReplyVo r WHERE r.board.boardseq = ?1")
	int findMaxGroupnumByBoardBoardseq(long boardSeq);

	@Query("SELECT MAX(r.depthnum) FROM ReplyVo r WHERE r.groupnum = ?2 AND r.board.boardseq = ?1")
	int findMaxDepthnumByGroupnum(long boardSeq,int groupnum);
}
