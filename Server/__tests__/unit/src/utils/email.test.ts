import userModel from "../../../../models/user.model";
import sendEmail from "../../../../src/utils/email";

describe("sendEmail", () => {
  it("should send email", async () => {
    const email = "test@mail.com";
    const token = new userModel().generateAuthToken();
    const res = await sendEmail(email, token);
    console.log(res);

    expect(res).not.toBeNull();
  });
});
