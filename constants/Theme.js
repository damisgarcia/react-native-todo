import Colors from "./Colors";

export default {
  btn:{
    marginTop: 4,
    marginBottom: 4
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
