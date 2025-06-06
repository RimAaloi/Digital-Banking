package ma.enset.projet_jee_spring_angular_jwt.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@DiscriminatorValue("SA")
@Data @NoArgsConstructor @AllArgsConstructor
public class  SavingAccount extends BankAccount {
    private double interestRate;
}