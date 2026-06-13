const accessForm = document.getElementById("kyoka-diary-access");

if (accessForm) {
  const input = accessForm.querySelector("input");
  const message = accessForm.querySelector(".auth-message");

  accessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input) return;

    if (input.value.trim() === "20030527") {
      if (message)
        message.textContent =
          "記録番号を確認しました。鏡花の日記①へ移動します。";
      window.location.href = "/diary/kyoka-1";
      return;
    }

    if (message)
      message.textContent =
        "記録番号が一致しません。出生記録を確認してください。";
  });
}
