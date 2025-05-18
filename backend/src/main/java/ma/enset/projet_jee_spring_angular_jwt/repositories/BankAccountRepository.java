package ma.enset.projet_jee_spring_angular_jwt.repositories;

import ma.enset.projet_jee_spring_angular_jwt.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount,String> {
    List<BankAccount> findByCustomerId(Long customerId);
}