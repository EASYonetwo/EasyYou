package com.easy.you.model;

import java.util.Date;


public interface ReplyRepositoryInterface{
	long getReplyseq();
	int getGroupnum();
	int getDepthnum();
	String getContent();
	Date getRegdate();
	String getDelflag();
	String getId();
	int getCountLikes();
	String getReplyLikes();
	int getCountDislikes();
	String getReplyDislikes();
}
