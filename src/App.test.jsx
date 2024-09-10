import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { SignUp } from "./pages/SignUp";

test("ログイン画面が表示されること", async () => {
    //レンダリング
    render(<SignUp />);

    expect(screen.getByText("ログイン画面")).toBeInTheDocument();
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();
  
});
