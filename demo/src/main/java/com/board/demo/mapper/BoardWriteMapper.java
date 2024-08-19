package com.board.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import com.board.demo.entity.BoardCreateEntity;
import com.board.demo.entity.CategoryIdNameEntity;
import com.board.demo.entity.FileInsertEntity;

@Mapper
public interface BoardWriteMapper {

        @Select("SELECT category_id as categoryId, name FROM category")
        List<CategoryIdNameEntity> getAllCategories();

        @Insert("INSERT INTO board (title, writer, views, reg_date, update_date, category_id, content, password) "
                        + "VALUES (#{title}, #{writer}, #{views}, NOW(), NOW(), #{categoryId}, #{content}, #{password})")
        @Options(useGeneratedKeys = true, keyProperty = "boardId") // BoardCreateEntity의 boardId값을 board의
                                                                   // auto_increment된 id 값을 맞춰줌
        void insertBoard(BoardCreateEntity board);

        @Insert("INSERT INTO files (board_id, attach_type, byte_size, uuid_name, org_name, file_dir) "
                        + "VALUES (#{boardId}, #{attachType}, #{byteSize}, #{uuidName}, #{orgName}, #{fileDir})")
        @Options(useGeneratedKeys = true, keyProperty = "fileId")
        void insertFile(FileInsertEntity file);
}
