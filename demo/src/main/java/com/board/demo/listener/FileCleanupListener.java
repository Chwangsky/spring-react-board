package com.board.demo.listener;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class FileCleanupListener {

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleFileCleanup(FileDeleteEvent event) {
        for (Path filePath : event.getFilesToDelete()) {
            try {
                if (Files.exists(filePath)) {
                    Files.delete(filePath);
                    log.info("File deleted: " + filePath);
                }
            } catch (IOException e) {
                log.error("Failed to delete file: " + filePath);
                e.printStackTrace();
            }
        }
    }
}
