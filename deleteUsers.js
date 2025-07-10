import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function deleteAllUsers(nextPageToken) {
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    const uids = listUsersResult.users.map(userRecord => userRecord.uid);

    if (uids.length > 0) {
        await auth.deleteUsers(uids);
        console.log(`Deleted ${uids.length} users`);
    }

    if (listUsersResult.pageToken) {
        await deleteAllUsers(listUsersResult.pageToken);
    }
}

deleteAllUsers().then(() => {
    console.log("All users deleted.");
}).catch((error) => {
    console.error("Error deleting users:", error);
});