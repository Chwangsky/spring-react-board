package com.board.demo.service.implement;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.board.demo.dto.request.delete.BoardDeleteRequestDTO;
import com.board.demo.exception.PasswordNotMatchException;
import com.board.demo.listener.FileDeleteEvent;
import com.board.demo.mapper.BoardDeleteMapper;
import com.board.demo.service.DeleteService;

@Service
public class DeleteServiceImpl implements DeleteService {

    private final BoardDeleteMapper mapper;
    private final ApplicationEventPublisher eventPublisher;

    public DeleteServiceImpl(BoardDeleteMapper mapper,
            ApplicationEventPublisher eventPublisher) {
        this.mapper = mapper;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteBoard(BoardDeleteRequestDTO boardDeleteRequestDTO) {
        Integer boardId = boardDeleteRequestDTO.getBoardId();
        String password = boardDeleteRequestDTO.getPassword();

        String foundPassword = mapper.findPasswordByBoardId(boardId);

        if (!password.equals(foundPassword)) {
            // 비밀번호 불일치 로직
            throw new PasswordNotMatchException();
        }

        List<Path> pathsToDelete = mapper.getAllDirsByBoardId(boardId).stream()
                .map(strDir -> Paths.get(strDir))
                .collect(Collectors.toList());

        Integer count = mapper.deleteUserById(boardId);
        if (count == 0) {
            // 삭제 실패 로직
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: Failed to delete the board.");
        } else {
            // 삭제 성공 로직
            eventPublisher.publishEvent(new FileDeleteEvent(pathsToDelete));
            return ResponseEntity.ok("Board deleted successfully.");
        }

    }
}
