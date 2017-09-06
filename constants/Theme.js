import Colors from "./Colors";

export default {
  btn:{
    marginVertical: 16
  },
  btnPrimary:{
    ...this.btn,
    backgroundColor: Colors.primaryColor,
  },
  formInput:{
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
    borderBottomColor: Colors.borderColor
  }
}
