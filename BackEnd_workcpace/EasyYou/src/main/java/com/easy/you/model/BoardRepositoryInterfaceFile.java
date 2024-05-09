package com.easy.you.model;

import java.util.Date;

public interface BoardRepositoryInterfaceFile {
	
	long getBoardseq();
	UserVo getUser();
	String getTitle();
	String getContent();
	String getBtype();
	String getDelflag();
	Date getRegdate();
	byte[] getFile();
	long getFileBoardseq();
}
