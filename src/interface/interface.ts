export type LoginData ={
    email:string,
    password:string
}

export type SingInData ={
    name:string,
    surname:string,
    email:string,
    password:string,
    birthdate:Date | string,
}

export type User = {
    id:number,
    name:string        
}

 export type FoodData = {
  id:number,
  date: Date,
  kcal:number,
  proteine:number,
  carboidrati:number,
  grassi:number
}

 export type FitData = {
  id:number,
  id_macchina:number,
  ripetizioni:number,
  load:number,
  data:string
}

export type GoalData = {
  id_user:number,
  goal_fit:number,
  goal_kcal:number,
  goal_fat:number,
  goal_prot:number,
  goal_carbo:number,

}

export type UserData = {
    fitData:FitData[],
    foodData:FoodData[],
    goalsData:GoalData
}

export type MachineParams = {
    id:number,
    marchio:string,
    nome:string,
    descrizione:string,
    imm:string,
    imm_what_train:string,
    accessiori:string
}

export type MachineData = {
    machineData:MachineParams[]
}

export type Machine = {
    label:string
    value:number
}

export type Dictionary<T> = {
  [key: string]: T
}