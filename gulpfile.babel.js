import requireDir from "require-dir"

//ディレクトリ指定してタスクランナーを呼ぶ
// run.js -> build.js -> ....

requireDir('./config/gulp', { recurse: true });
