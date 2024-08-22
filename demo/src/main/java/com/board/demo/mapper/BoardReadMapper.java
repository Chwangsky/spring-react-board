package com.board.demo.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.board.demo.entity.BoardDetailEntity;
import com.board.demo.entity.CommentEntity;
import com.board.demo.entity.FileEntity;

@Mapper
public interface BoardReadMapper {

        @Select("SELECT b.board_id AS boardId, "
                        + "(SELECT c.name FROM category c WHERE c.category_id = b.category_id) AS category, "
                        + "b.title AS title, "
                        + "b.writer AS writer, "
                        + "b.content AS content, "
                        + "b.reg_date AS regDate, " + "b.update_date AS updateDate "
                        + "FROM board b " + "WHERE b.board_id = #{boardId}")
        BoardDetailEntity selectBoardDetailById(int boardId);

        @Select("SELECT c.comment_id AS commentId, " + "c.content AS content, "
                        + "c.reg_date AS regDate, "
                        + "c.writer AS writer "
                        + "FROM comments c "
                        + "WHERE c.board_id = #{boardId}")
        List<CommentEntity> selectCommentsByBoardId(@Param("boardId") int boardId);

        @Select("SELECT f.files_id AS fileId, " + "f.attach_type AS attachType, "
                        + "f.byte_size AS byteSize, " + "f.uuid_name AS uuidName, "
                        + "f.org_name AS orgName, " + "f.file_dir AS fileDir " + "FROM files f "
                        + "WHERE f.board_id = #{boardId}")
        List<FileEntity> selectFilesByBoardId(@Param("boardId") int boardId);

        // 조회수를 1 증가시키는 메서드
        @Insert("UPDATE board SET views = views + 1 WHERE board_id = #{boardId}")
        void incrementViewCount(@Param("boardId") int boardId);

        // 댓글 추가하는 메서드
        @Insert("INSERT INTO comments (board_id, content, writer, reg_date) "
                        + "VALUES (#{boardId}, #{content}, #{writer}, NOW())")
        void insertComment(@Param("boardId") int boardId, @Param("content") String content,
                        @Param("writer") String writer);

}
