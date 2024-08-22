package com.board.demo.dto.response.read;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;

import com.board.demo.common.ResponseCode;
import com.board.demo.common.ResponseMessage;
import com.board.demo.dto.response.ResponseDTO;
import com.board.demo.entity.BoardDetailEntity;
import com.board.demo.entity.CommentEntity;
import com.board.demo.entity.FileEntity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class BoardReadResponseDTO extends ResponseDTO {
        private BoardDetailItem boardDetailItem;
        private List<CommentItem> commentItems;
        private List<FileItem> fileItems;

        private static BoardReadResponseDTO fromEntities(BoardDetailEntity boardDetailEntity,
                        List<CommentEntity> commentEntities, List<FileEntity> fileEntities) {
                BoardDetailItem boardDetailItem = BoardDetailItem.builder()
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
                                .boardDetailItem(boardDetailItem)
                                .commentItems(commentItems)
                                .fileItems(fileItems)
                                .code(ResponseCode.SUCCESS)
                                .message(ResponseMessage.SUCCESS)
                                .build();
        }

        public static ResponseEntity<BoardReadResponseDTO> success(BoardDetailEntity boardDetailEntity,
                        List<CommentEntity> commentEntities, List<FileEntity> fileEntities) {
                BoardReadResponseDTO result = BoardReadResponseDTO
                                .fromEntities(boardDetailEntity, commentEntities, fileEntities);

                return ResponseEntity.ok().body(result);
        }
}
