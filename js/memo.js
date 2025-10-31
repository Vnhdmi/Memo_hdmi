"use strict"

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {
        // 1.localStorageが使えるか確認
        if (typeof localStorage == "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage(); //get data from storage
            saveLocalStorage(); //2.localStorageへの保存 (ほぞん) |
        }
    }
);

//2.localStorageへの保存 (ほぞん)
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            // 値の入力チェック
            if (key == "" || value == "") {
                window.alert("Key、Memoはいずれも必須 (ひっす)です。");
                return;
            } else {
                localStorage.setItem(key, value);
                viewStorage();
                let w_msg = "LocalStorageに" + key + " " + value + "を保存(ほぞん)しました。"; 
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }
    );
};

function  viewStorage() {
    const list = document.getElementsByClassName("list");
    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        list[i].appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage .getItem(w_key);

    }
};
