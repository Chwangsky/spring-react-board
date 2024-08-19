package com.board.demo.dto.response.read;

import java.util.List;
import java.util.stream.Collectors;

import com.board.demo.entity.BoardDetailEntity;
import com.board.demo.entity.CommentEntity;
import com.board.demo.entity.FileEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardReadResponseDTO {
        private BoardItem boardItem;
        private List<CommentItem> commentItems;
        private List<FileItem> fileItems;

        public static BoardReadResponseDTO fromEntities(BoardDetailEntity boardDetailEntity,
                        List<CommentEntity> commentEntities, List<FileEntity> fileEntities) {
                BoardItem boardItem = BoardItem.builder()
                                .boardId(boardDetailEntity.getBoardId())
                                .category(boardDetailEntity.getCategory())
                                .title(boardDetailEntity.getTitle())
                                .content(boardDetailEntity.getContent())
                                .regDate(boardDetailEntity.getRegDate())
                                .updateDate(boardDetailEntity.getUpdateDate())
                                .build();

                List<CommentItem> commentItems = commentEntities.stream()
                                .map(comment -> CommentItem.builder()
                                                .commentId(comment.getCommentId())
                                                .content(comment.getContent())
                                                .writer(comment.getWriter())
                                                .regDate(comment.getRegDate())
                                                .build())
                                .collect(Collectors.toList());

                List<FileItem> fileItems = fileEntities.stream()
                                .map((FileEntity file) -> FileItem.builder()
                                                .fileId(file.getFileId())
                                                .attachType(file.getAttachType())
                                                .byteSize(file.getByteSize())
                                                .uuidName(file.getUuidName())
                                                .orgName(file.getOrgName())
                                                .fileDir(file.getFileDir())
                                                .build())
                                .collect(Collectors.toList());

                return BoardReadResponseDTO.builder()
                                .boardItem(boardItem)
                                .commentItems(commentItems)
                                .fileItems(fileItems)
                                .build();
        }
}
