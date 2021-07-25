import { HttpService } from 'services';

export default class DocumentService {
    static baseURL() {
        return 'http://localhost:4000/documents';
    }

    static getDocuments() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                DocumentService.baseURL(),
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getProcessedDocuments(condition) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${DocumentService.baseURL()}/${condition}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static verifyDocument(docId, docType, ownerId, officialName) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${DocumentService.baseURL()}/verify`,
                {
                    docId: docId,
                    docType: docType,
                    ownerId: ownerId,
                    officialName: officialName
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static declineDocument(docId, docType, ownerId, officialName) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${DocumentService.baseURL()}/decline`,
                {
                    docId: docId,
                    docType: docType,
                    ownerId: ownerId,
                    officialName: officialName
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
}
