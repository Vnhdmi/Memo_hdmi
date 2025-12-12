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
            delLocalStorage();
            allClearLocalStorage();
            selectTable();
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
                let w_confirm = confirm("LocalStorage " + key + " " + value + "を保存(ほぞん)しますか ")
                if (w_confirm) { //version-up1-add
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存(ほぞん)しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                } //version-up1-add

            }
        }, false
    );
};

function viewStorage() {
    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        // list[i].appendChild(tr);

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        $("#table1").tablesorter({
            sortList: [[1, 0]]
        });
        $("#table1").trigger("update");
    }
}

function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select");

        }, false

    );
}

//no thing
// del ver 3.0 
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();

            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            // let w_sel = 0; 2025/12/12
            // w_sel = selectCheckBox();
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");

            // 値の入力チェック
            if (w_cnt >= 1) {
                // const key = document.getElementById("textKey").value;
                // const value = document.getElementById("textMemo").value;
                let w_confirm = confirm("LocalStorageから選択されている" + w_cnt + "件を削除（delete）しましたか 。`");
                if (w_confirm ) {//version-up1-add
                    for (let i = 0; i < chkbox1.length; i++) {
                        if (chkbox1[i].checked) {
                            let delkey = table1.rows[i + 1].cells[1].firstChild.data ;
                            localStorage.removeItem(delkey);
                        } //ver 3
                    }
                    viewStorage();
                    let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除（delete）しました 。`";
                    window.alert(w_msg);
                }//version-up1-add // del on 2025/12/12


            }
        }, false
    );
};

function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = confirm("LocalStorageのデータをすべて削除（allclear）します。\n よろしいですか。");
            // 値の入力チェック
            // if (w_confirm==true) {
            if (w_confirm) {

                localStorage.clear();
                viewStorage();
                let w_msg = `LocalStorageのデータすべて削除（all clear）しました。`;
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};

function selectCheckBox(mode) {
    let w_sel = "0";
    let w_cnt = 0;
    let w_textKey = "";
    let w_textMemo = "";

    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1"); 


    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;

            }
            w_cnt++;

        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
   if(mode === "select") {
    if (w_cnt === 1) {
        return "1";

    } else {
        window.alert("１つ選択（select）してください。");
    }
   }

   if(mode === "del") {
    if(w_cnt >= 1) {
        return w_cnt;
    }else{
        window.alert("１つ選択（select）してください。");
    }
   }
}
