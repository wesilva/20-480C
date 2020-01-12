export class LocalStarStorage {
    constructor(localStorage) {
        this.localStorage = localStorage;
        this.load();
    }

    addStar(sessionId) {
        if (this.isStarred(sessionId)) return;

        this.sessions.push(sessionId);
        this.save();
    }

    removeStar(sessionId) {
        const index = this.sessions.indexOf(sessionId);
        if (index >= 0) {
            this.sessions.splice(index, 1);
            this.save();
        }
    }

    isStarred(sessionId) {
        return this.sessions.indexOf(sessionId) >= 0;
    }

    load() {        
        const json = this.localStorage.getItem("stars");
        if (json) {
            try {
                this.sessions = JSON.parse(json) || [];
            } catch (exception) {
                this.sessions = [];
            }
        } else {
            this.sessions = [];
        }
    }

    save() {
        this.localStorage.setItem("stars", JSON.stringify(this.sessions));
    }
}