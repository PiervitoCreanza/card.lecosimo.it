const errorMessages = {
  "permission-denied": {
    title: "Permessi non sufficienti",
    description:
      "Non hai i permessi per visualizzare queste informazioni. Se sei un esercente esegui l'accesso. Nel caso dovessi  continuare a riscontrare problemi contatta l'assistenza.",
  },
  unavailable: {
    title: "Non sei connesso",
    description:
      "Non sei connesso! Prova a verificare la tua connessione ad internet. Nel caso dovessi continuare a riscontrare problemi contatta l'assistenza.",
  },
  cardDoesNotExist: {
    title: "Carta non valida",
    description:
      "La card scansionata non esiste nei nostri sistemi, potrebbe trattarsi di una carta falsa o duplicata. L'utente che la possiede non ha diritto a eventuali sconti. Per approfondimenti contatta l'assistenza.",
  },
};

export const formatError = (errorCode) => {
  if (!errorMessages[errorCode]) {
    return {
      isError: true,
      code: errorCode,
      message: {
        title: "Errore interno",
        description:
          "Si è verificato un errore inaspetatto, prova a ricaricare la pagina. Nel caso dovessi continuare a riscontrare problemi contatta l'assistenza.",
      },
    };
  }

  return {
    isError: true,
    code: errorCode,
    message: errorMessages[errorCode],
  };
};
