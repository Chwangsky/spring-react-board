package com.board.demo.dto.request.update;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdatePostRequestDTO {

    @NotNull
    Integer boardId;

    @Size(min = 4, max = 99, message = "제목의 길이는 4글자 이상 100글자 이하입니다.")
    String title;

    @Size(min = 4, max = 15, message = "비밀번호의 길이는 4글자 이상, 16글자 미만입니다.")
    String password;

    @Size(min = 3, max = 4, message = "작성자의 길이는 3글자 이상, 5글자 미만입니다.")
    String writer;

    @Size(min = 4, max = 1999, message = "내용의 길이는 4글자 이상, 2000글자 미만입니다.")
    String content;

    String removeFiles; // TODO removeFiles="1,2,3"과 같은 방식으로 넘어온다. 1, 2, 3은 삭제할 file의 id를 의미

    MultipartFile[] newFiles;
}