package com.board.demo.dto.response.update;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;

import com.board.demo.common.ResponseCode;
import com.board.demo.common.ResponseMessage;
import com.board.demo.dto.response.ResponseDTO;
import com.board.demo.entity.BoardUpdateDetailEntity;
import com.board.demo.entity.FileEntity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class UpdateResponseDTO extends ResponseDTO {
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
    private static UpdateResponseDTO fromEntities(BoardUpdateDetailEntity boardDetailEntity,
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
                .code(ResponseCode.SUCCESS)
                .message(ResponseMessage.SUCCESS)
                .build();
    }

    public static ResponseEntity<UpdateResponseDTO> success(BoardUpdateDetailEntity boardDetailEntity,
            List<FileEntity> fileEntities) {
        UpdateResponseDTO result = UpdateResponseDTO.fromEntities(boardDetailEntity, fileEntities);
        return ResponseEntity.ok().body(result);

    }
}
