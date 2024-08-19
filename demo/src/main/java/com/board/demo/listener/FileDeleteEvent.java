package com.board.demo.listener;

import java.nio.file.Path;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FileDeleteEvent {

    private final List<Path> filesToDelete;

    public List<Path> getFilesToDelete() {
        return filesToDelete;
    }
}