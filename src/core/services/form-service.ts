import HttpClient from "./httpClient";

export default class FormService {
  // submit and temp save form
  static createItem(body: any) {
    return HttpClient.post("https://forms.googleapis.com/v1/forms", body);
  }
  // update form
  static updateItem(formId: string, body: any) {
    return HttpClient.post(
      `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`,
      body
    );
  }
  // get form
  static getItem(formId: string) {
    return HttpClient.get(`https://forms.googleapis.com/v1/forms/${formId}`);
  }

  // get list form submit and temp save
  static getListForm(params: any) {
    return HttpClient.get(
      "https://binunu4cvvpp4geo3yrsddteqy0bugft.lambda-url.ap-northeast-1.on.aws/",
      { params }
    );
  }
  // get detail form submit and temp save
  static getDetailForm(params: any) {
    return HttpClient.get(
      "https://rcaa37w4is4b7n6puvh4iyft6q0ghnnj.lambda-url.ap-northeast-1.on.aws/",
      { params }
    );
  }
  // get list answer
  static getListAnswer(params: any) {
    return HttpClient.get(
      "https://zf7axb7zcrnq6vy3diisjt3hiy0zuavs.lambda-url.ap-northeast-1.on.aws/",
      { params }
    );
  }
  // get link file excel
  static getLinkFileExcel(params: any) {
    return HttpClient.get(
      "https://njoajrdpdustwd4lykyjrrbjge0npzjr.lambda-url.ap-northeast-1.on.aws/",
      { params }
    );
  }
  // get link set up file config
  static getLinkSetUpFileConfig() {
    return HttpClient.get(
      "https://stootg2io7igp2hjwm53nwn2zy0pvefy.lambda-url.ap-northeast-1.on.aws"
    );
  }
  // update status response
  static postStatusResponse(body: any) {
    return HttpClient.post(
      "https://4iemsd43npcw3kkfktmjqximhy0xtsqn.lambda-url.ap-northeast-1.on.aws",
      body
    );
  }
}
