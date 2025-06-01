# 📌 Application Web JEE — BankingAPP

Projet réalisé dans le cadre du cours de **Spring JEE** dispensé par **Prof. Mohamed YOUSSFI**.

---

## 💡 Description

**BankingAPP** est une application de gestion bancaire développée avec **Spring Boot** pour le backend et **Angular** pour le frontend.  
Elle permet de gérer les clients, leurs comptes bancaires et leurs transactions, en utilisant **Spring Data JPA** pour la gestion de la base de données backend, et **MySQL** comme système de gestion de base de données relationnelle.

---

## 🚀 Fonctionnalités

### 👥 Client Management
- Ajout, modification, recherche, suppression et affichage des informations des clients.

### 🏦 Account Management
- Consultation des comptes bancaires et recherche par ID.

### 💸 Transaction Management
- Exécution de débits, crédits et transferts entre comptes.

### 🕘 History Management
- Affichage de l'historique des opérations pour chaque compte.

---

## 🛠️ Technologies utilisées

| Technologie        | Description                                      |
|--------------------|--------------------------------------------------|
| Java               | Langage de programmation principal pour le backend |
| Spring Boot        | Framework pour le développement du backend       |
| Spring Data JPA    | Accès aux données dans le backend                |
| MySQL              | Base de données relationnelle                    |
| Angular            | Framework frontend                               |
| TypeScript         | Langage de développement Angular                 |
| JWT                | Sécurité via JSON Web Token                      |
| Maven              | Gestionnaire de dépendances et build             |
| Git                | Contrôle de version                              |

---

## 📢 Notes

- 🚀 
- 🔧 

---

## 🔐 Sécurité

L’application intègre **Spring Security avec JWT** pour sécuriser les **API du backend**, tandis que le **frontend Angular** gère l'authentification via des intercepteurs.

### Fonctionnalités :
- Authentification via token JWT.
- Gestion des rôles : `USER`, `ADMIN`.
- Protection des endpoints :
  - Les endpoints de gestion des comptes sont accessibles uniquement après authentification.
  - Redirection ou erreur `403` en cas d’accès non autorisé.

---

## 📂 Structure du projet
```
structure Spring 

├───.mvn
│   └───wrapper
├───src
│   ├───main
│   │   ├───java
│   │   │   └───ma
│   │   │       └───enset
│   │   │           └───projet_jee_spring_angular_jwt
│   │   │               ├───dtos
│   │   │               ├───entities
│   │   │               ├───enums
│   │   │               ├───exceptions
│   │   │               ├───mappers
│   │   │               ├───repositories
│   │   │               ├───security
│   │   │               ├───services
│   │   │               └───web
│   │   └───resources
│   └───test
│       └───java
│           └───ma
│               └───enset
│                   └───projet_jee_spring_angular_jwt
└───target
    ├───classes
    │   └───ma
```
structure angular
```
├───public
└───src
    └───app
        ├───accounts
        ├───admin-template
        ├───customer-accounts
        ├───customers
        ├───edit-customer
        ├───interceptors
        ├───login
        ├───model
        ├───navbar
        ├───new-customer
        └───services
```
---

## 📸 Captures d’écran

### 📊 Page Login  
![Login Page](Screenshots/login.png)
*Caption : Page de connexion sécurisée avec JWT*

### 📊 Client List  
![client Page](Screenshots/.png)
*Caption : Liste des clients avec options d’édition et suppression*

### 🔍 Search an Account  
![Login Page](Screenshots/1.png)
*Caption : Interface de recherche des comptes bancaires par ID*

### ➕ Add a Client  
![Login Page](Screenshots/1.png)
*Caption : Formulaire d’ajout d’un nouveau client*

### ✏️ Edit a Client  
![Login Page](Screenshots/1.png)
*Caption : Modification des informations d’un client existant*

### 🗑️ Delete a Client 
![Login Page](Screenshots/1.png)
*Caption : Suppression d’un client depuis la base de données*

---

## 🧩 Exemples de code

### 🖥️ `Customer.java`
```java

package ma.enset.projet_jee_spring_angular_jwt.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    @OneToMany(mappedBy = "customer")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<BankAccount> bankAccounts;
}
```
### 🖥️ `CustomerRepository.java`
```
package ma.enset.projet_jee_spring_angular_jwt.repositories;

import ma.enset.projet_jee_spring_angular_jwt.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    @Query("select c from Customer c where c.name like :kw")
    List<Customer> searchCustomer(@Param("kw") String keyword);
}
```
### 🖥️ `CustomerRestController`
```
package ma.enset.projet_jee_spring_angular_jwt.web;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import ma.enset.projet_jee_spring_angular_jwt.dtos.BankAccountDTO;
import ma.enset.projet_jee_spring_angular_jwt.dtos.CustomerDTO;
import ma.enset.projet_jee_spring_angular_jwt.exceptions.CustomerNotFoundException;
import ma.enset.projet_jee_spring_angular_jwt.services.BankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class CustomerRestController {
    private BankAccountService bankAccountService;

    @GetMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<CustomerDTO> customers(){
        return bankAccountService.listCustomers();
    }

    @GetMapping("/customers/search")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<CustomerDTO> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return bankAccountService.searchCustomers("%"+keyword+"%");
    }

    @PreAuthorize("hasAuthority('SCOPE_USER')")
    @GetMapping("/customers/{id}")
    public CustomerDTO getCustomer(@PathVariable(name = "id") Long customerId) throws CustomerNotFoundException {
        return bankAccountService.getCustomer(customerId);
    }

    @PostMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customerDTO){
        return bankAccountService.saveCustomer(customerDTO);
    }
    @PutMapping("/customers/{customerId}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CustomerDTO updateCustomer(@PathVariable Long customerId, @RequestBody CustomerDTO customerDTO){
        customerDTO.setId(customerId);
        return bankAccountService.updateCustomer(customerDTO);
    }
    @DeleteMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void deleteCustomer(@PathVariable Long id){
        bankAccountService.deleteCustomer(id);
    }
    @GetMapping("/{customerId}/accounts")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public List<BankAccountDTO> getCustomerAccounts(@PathVariable Long customerId) {
        return bankAccountService.getAccountsByCustomerId(customerId);
    }
}
```

## 🎥 Vidéos de Cours
Ces vidéos ont été réalisées par **Prof. Mohamed YOUSSFI** dans le cadre du cours **Spring Boot & Angular** :

### 📌 Partie 1 : presentation de projet  
- [Présentation du Projet](https://www.youtube.com/watch?v=x6gFWmRxNPE&authuser=0)

### 📌 Partie 2 : backend 
- [video 1](https://www.youtube.com/watch?v=muuFQWnCQd0&authuser=0)
- [video 2](https://www.youtube.com/watch?v=PTI8cniOXLc)

### 📌 Partie 3 :Client
- [Client Angular](https://www.youtube.com/watch?v=bOoPKctcE0s )
- 
### 📌 Partie 4 : Sécurité avec Spring Security  

1. [Sécuriser l'application avec système d'authentification]( https://www.youtube.com/watch?v=n65zFfl9dqA&authuser=0)


---

### ✅ Consignes

- 🛠️ Créer un **repository GitHub**.
- 💾 Effectuer un **commit et push toutes les 30 minutes** environ.
- 📝 Utiliser ce fichier **`README.md`** pour rédiger le rapport du projet.
- 📅 Faire un **dernier commit avant le 01 Juin 2025 à 13:30**.
- 🔧 Poursuivre ensuite le développement et **compléter l’activité pratique**.

---

### 💌 Auteur

👩‍💻 **Rim Aaloi**  
💌 Contact: [GitHub Profile](https://github.com/RimAaloi) | [LinkedIn](https://www.linkedin.com/in/rim-aaloi/)  

---

### 📚 Ressources

- 📘 [Spring Documentation](https://spring.io/docs)
- 📘 [Angular Documentation](https://angular.io/docs)
- 📘 [MySQL Documentation](https://dev.mysql.com/doc/)
