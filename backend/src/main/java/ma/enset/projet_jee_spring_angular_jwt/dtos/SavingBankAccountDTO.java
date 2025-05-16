package ma.enset.projet_jee_spring_angular_jwt.dtos;
import lombok.Data;
import ma.enset.projet_jee_spring_angular_jwt.enums.AccountStatus;

import java.util.Date;
@Data
public class SavingBankAccountDTO extends BankAccountDTO {
    private String id;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private CustomerDTO customerDTO;
    private double interestRate;
}