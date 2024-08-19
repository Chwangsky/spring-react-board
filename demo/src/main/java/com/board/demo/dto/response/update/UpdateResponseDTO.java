package com.board.demo.dto.response.update;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.board.demo.entity.BoardUpdateDetailEntity;
import com.board.demo.entity.FileEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateResponseDTO {
        private Integer boardId;
        private String category;
        private LocalDateTime regDate;
        private LocalDateTime updateDate;
        private Integer views;
        private String writer;
        private String title;
        private String content;

        private List<FileItem> files;

        // TODO entity -> dto mapper 찾아보기
        public static UpdateResponseDTO fromEntities(BoardUpdateDetailEntity boardDetailEntity,
                        List<FileEntity> fileEntities) {
                // FileEntity 리스트를 FileItem 리스트로 변환
                List<FileItem> fileItems = fileEntities.stream()
                                .map(fileEntity -> FileItem.builder()
                                                .fileId(fileEntity.getFileId())
                                                .attachType(fileEntity.getAttachType())
                                                .byteSize(fileEntity.getByteSize())
                                                .uuidName(fileEntity.getUuidName())
                                                .orgName(fileEntity.getOrgName())
                                                .fileDir(fileEntity.getFileDir())
                                                .build())
                                .collect(Collectors.toList());

                return UpdateResponseDTO.builder()
                                .boardId(boardDetailEntity.getBoardId())
                                .category(boardDetailEntity.getCategory())
                                .regDate(boardDetailEntity.getRegDate())
                                .updateDate(boardDetailEntity.getUpdateDate())
                                .views(boardDetailEntity.getViews())
                                .writer(boardDetailEntity.getWriter())
                                .title(boardDetailEntity.getTitle())
                                .content(boardDetailEntity.getContent())
                                .files(fileItems)
                                .build();
        }
}
