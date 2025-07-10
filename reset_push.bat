@echo off
echo ==== STARTING CLEAN PUSH PROCESS ====

REM 1. Create orphan branch
git checkout --orphan cleaned-main

REM 2. Add all current files
git add .

REM 3. Commit new clean version
git commit -m "Clean version without sensitive keys"

REM 4. Delete serviceAccountKey.json if exists
IF EXIST serviceAccountKey.json (
    del serviceAccountKey.json
    echo 🔒 Deleted serviceAccountKey.json
)

REM 5. Add to .gitignore
echo serviceAccountKey.json>>.gitignore
git add .gitignore
git commit -m "Add serviceAccountKey.json to .gitignore"

REM 6. Rename branch to main
git branch -M main

REM 7. Set remote URL again (can be skipped if already set)
git remote set-url origin https://github.com/MantasKukulskis/expense-tracker-dashboard.git

REM 8. Force push to GitHub
git push --force origin main

echo ==== DONE ====
pause
