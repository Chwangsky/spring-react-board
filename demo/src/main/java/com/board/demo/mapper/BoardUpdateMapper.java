package com.board.demo.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import com.board.demo.entity.BoardUpdateDetailEntity;
import com.board.demo.entity.FileEntity;
import com.board.demo.entity.FileInsertEntity;

@Mapper
public interface BoardUpdateMapper {

        @Select("SELECT " + "b.board_id as boardId, "
                        + "(SELECT c.name FROM category c WHERE c.category_id = b.category_id) AS category, "
                        + "b.reg_date AS regDate, " + "b.update_date AS updateDate, "
                        + "b.views AS views, " + "b.writer AS writer, " + "b.password AS password, "
                        + "b.title AS title, " + "b.content AS content " + "FROM board b "
                        + "WHERE b.board_id = #{boardId}")
        BoardUpdateDetailEntity selectBoardDetailById(int boardId);

        @Select("SELECT " + "f.files_id AS fileId, " + "f.attach_type AS attachType, "
                        + "f.byte_size AS byteSize, " + "f.uuid_name AS uuidName, "
                        + "f.org_name AS orgName, " + "f.file_dir AS fileDir " + "FROM files f "
                        + "WHERE f.board_id = #{boardId}")
        List<FileEntity> selectFilesByBoardId(@Param("boardId") int boardId);

        @Update("UPDATE board SET title = #{title}, content = #{content}, writer = #{writer} WHERE board_id = #{boardId}")
        void updateBoard(@Param("boardId") int boardId, @Param("title") String title,
                        @Param("content") String content, @Param("writer") String writer);

        @Delete("DELETE FROM files WHERE files_id = #{fileId}")
        void deleteFileById(@Param("fileId") int fileId);

        @Update("INSERT INTO files (board_id, attach_type, byte_size, uuid_name, org_name, file_dir) "
                        + "VALUES (#{boardId}, #{attachType}, #{byteSize}, #{uuidName}, #{orgName}, #{fileDir})")
        void insertFile(FileInsertEntity fileEntity);

        @Update("Update board SET update_date = NOW() WHERE board_id = #{boardId}")
        void updateUpdateDate(@Param("boardId") int boardId);

        @Select("SELECT file_dir FROM files WHERE files_id = #{fileId}")
        String getDirByFileId(@Param("fileId") int fileId);

}
