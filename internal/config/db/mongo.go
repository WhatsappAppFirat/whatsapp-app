package db

import (
	"time"

	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const dbName = "whatsapp-app"
const dbPass = "T.C.1923a"
const dbUser = "root"

func Connect() {

	serverAPIOptions := options.ServerAPI(options.ServerAPIVersion1)
	_ = mgm.SetDefaultConfig(&mgm.Config{CtxTimeout: 12 * time.Second}, dbName, options.Client().
		ApplyURI("mongodb+srv://"+dbUser+":"+dbPass+"@whatsapp-app.hecfb4r.mongodb.net/?retryWrites=true&w=majority").SetServerAPIOptions(serverAPIOptions))

}
