package com.easy.you.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.ReplyDislikesVo;

public interface ReplyDislikesRepository extends JpaRepository<ReplyDislikesVo, Long>{

	ReplyDislikesVo findByReplyReplyseqAndUserId(long replySeq, String id);
}
