package com.easy.you.model;

import java.util.Date;

public interface BoardRepositoryInterfaceCommon {
	
	long getBoardseq();
	UserVo getUser();
	String getTitle();
	String getContent();
	String getBtype();
	String getDelflag();
	Date getRegdate();
	int getCountLikes();
	int getCountDislikes();
	int getCountViews();
}
